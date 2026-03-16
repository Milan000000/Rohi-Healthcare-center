import React from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  MessageSquare, 
  RefreshCw, 
  Pill, 
  LogOut, 
  CheckCircle2, 
  Clock, 
  Trash2,
  Download,
  Search,
  LogIn
} from 'lucide-react';
import { db, auth } from '../firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';
import { format } from 'date-fns';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export default function Admin() {
  const [isPasswordAuthenticated, setIsPasswordAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState<any>(null);
  const [password, setPassword] = React.useState('');
  const [activeTab, setActiveTab] = React.useState<'inquiries' | 'refills' | 'drugs'>('inquiries');
  const [inquiries, setInquiries] = React.useState<any[]>([]);
  const [refills, setRefills] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const handleFirestoreError = (err: any, operationType: OperationType, path: string | null) => {
    const errInfo = {
      error: err instanceof Error ? err.message : String(err),
      authInfo: {
        userId: auth.currentUser?.uid,
        email: auth.currentUser?.email,
        emailVerified: auth.currentUser?.emailVerified,
        isAnonymous: auth.currentUser?.isAnonymous,
      },
      operationType,
      path
    };
    console.error('Firestore Error: ', JSON.stringify(errInfo));
    setError(`Permission Denied: Please ensure you are logged in with the correct admin account (${auth.currentUser?.email || 'Not Logged In'}).`);
  };

  React.useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubAuth();
  }, []);

  React.useEffect(() => {
    if (!isPasswordAuthenticated || !user) return;

    setError(null);
    setLoading(true);

    const qInquiries = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
    const unsubInquiries = onSnapshot(qInquiries, 
      (snapshot) => {
        setInquiries(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
      },
      (err) => handleFirestoreError(err, OperationType.GET, 'inquiries')
    );

    const qRefills = query(collection(db, 'refills'), orderBy('createdAt', 'desc'));
    const unsubRefills = onSnapshot(qRefills, 
      (snapshot) => {
        setRefills(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      },
      (err) => handleFirestoreError(err, OperationType.GET, 'refills')
    );

    return () => {
      unsubInquiries();
      unsubRefills();
    };
  }, [isPasswordAuthenticated, user]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'milan000000') {
      setIsPasswordAuthenticated(true);
    } else {
      alert('Invalid password');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error signing in with Google:', error);
      alert('Failed to sign in with Google');
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setIsPasswordAuthenticated(false);
  };

  const updateStatus = async (collectionName: string, id: string, status: string) => {
    try {
      await updateDoc(doc(db, collectionName, id), { status });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `${collectionName}/${id}`);
    }
  };

  const deleteEntry = async (collectionName: string, id: string) => {
    if (!confirm('Are you sure you want to delete this entry?')) return;
    try {
      await deleteDoc(doc(db, collectionName, id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `${collectionName}/${id}`);
    }
  };

  const exportToCSV = (data: any[], filename: string) => {
    const headers = Object.keys(data[0] || {}).join(',');
    const rows = data.map(row => 
      Object.values(row).map(val => 
        (val && typeof val === 'object' && 'toDate' in val) ? format((val as any).toDate(), 'yyyy-MM-dd HH:mm') : `"${val}"`
      ).join(',')
    );
    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  if (!isPasswordAuthenticated || !user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-100 w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="bg-red-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Admin Login</h2>
            <p className="text-gray-500">Authenticate to access dashboard</p>
          </div>

          {!isPasswordAuthenticated ? (
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Staff Password</label>
                <input 
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
              <button className="w-full bg-red-600 text-white py-4 rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg">
                Verify Password
              </button>
            </form>
          ) : !user ? (
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <p className="text-sm text-blue-700 leading-relaxed">
                  Password verified. Now, please sign in with your **Admin Google Account** to securely access the database.
                </p>
              </div>
              <button 
                onClick={handleGoogleSignIn}
                className="w-full bg-white border border-gray-200 text-gray-700 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-sm flex items-center justify-center gap-3"
              >
                <LogIn className="h-5 w-5" />
                Sign in with Google
              </button>
              <button 
                onClick={() => setIsPasswordAuthenticated(false)}
                className="w-full text-gray-500 text-sm hover:text-gray-700 transition-all"
              >
                Back to password
              </button>
            </div>
          ) : null}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden lg:flex flex-col">
        <div className="p-8 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Pill className="h-6 w-6 text-red-600" />
            <span className="font-bold text-xl">Rohi Admin</span>
          </div>
          <div className="mt-4 flex items-center gap-2 px-2 py-1 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[10px] text-gray-500 truncate">{user.email}</span>
          </div>
        </div>
        <nav className="flex-1 p-6 space-y-2">
          <button 
            onClick={() => setActiveTab('inquiries')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'inquiries' ? 'bg-red-50 text-red-600 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <MessageSquare className="h-5 w-5" />
            Inquiries
            {inquiries.filter(i => i.status === 'Pending').length > 0 && (
              <span className="ml-auto bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-full">
                {inquiries.filter(i => i.status === 'Pending').length}
              </span>
            )}
          </button>
          <button 
            onClick={() => setActiveTab('refills')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'refills' ? 'bg-red-50 text-red-600 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <RefreshCw className="h-5 w-5" />
            Refills
          </button>
          <button 
            onClick={() => setActiveTab('drugs')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'drugs' ? 'bg-red-50 text-red-600 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Pill className="h-5 w-5" />
            Inventory
          </button>
        </nav>
        <div className="p-6 border-t border-gray-100">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-red-600 transition-all"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {error && (
          <div className="mb-8 bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-3 text-red-700">
            <div className="bg-red-100 p-2 rounded-full">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 capitalize">{activeTab}</h1>
            <p className="text-gray-500">Manage your pharmacy {activeTab} here.</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => exportToCSV(activeTab === 'inquiries' ? inquiries : refills, `${activeTab}.csv`)}
              className="bg-white border border-gray-200 px-6 py-2.5 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </button>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 font-medium mb-1">Total {activeTab}</p>
            <p className="text-3xl font-bold text-gray-900">
              {activeTab === 'inquiries' ? inquiries.length : activeTab === 'refills' ? refills.length : 0}
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 font-medium mb-1">Pending</p>
            <p className="text-3xl font-bold text-red-600">
              {activeTab === 'inquiries' ? inquiries.filter(i => i.status === 'Pending').length : refills.filter(r => r.status === 'Pending').length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 font-medium mb-1">Completed</p>
            <p className="text-3xl font-bold text-green-600">
              {activeTab === 'inquiries' ? inquiries.filter(i => i.status === 'Completed').length : refills.filter(r => r.status === 'Completed').length}
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Details</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {(activeTab === 'inquiries' ? inquiries : refills).map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-6">
                      <p className="font-bold text-gray-900">{item.customerName}</p>
                      <p className="text-sm text-gray-500">{item.phoneNumber}</p>
                    </td>
                    <td className="px-6 py-6">
                      {activeTab === 'inquiries' ? (
                        <>
                          <p className="font-medium text-red-600">{item.drugName}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </>
                      ) : (
                        <>
                          <p className="font-medium text-red-600">Refill Request</p>
                          <p className="text-sm text-gray-500">ID: {item.previousPrescriptionId || 'N/A'}</p>
                        </>
                      )}
                    </td>
                    <td className="px-6 py-6 text-sm text-gray-500">
                      {item.createdAt ? format(item.createdAt.toDate(), 'MMM d, h:mm a') : '...'}
                    </td>
                    <td className="px-6 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        item.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                        item.status === 'Ready' ? 'bg-blue-100 text-blue-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => updateStatus(activeTab, item.id, 'Ready')}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Mark as Ready"
                        >
                          <Clock className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => updateStatus(activeTab, item.id, 'Completed')}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Mark as Completed"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => deleteEntry(activeTab, item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

function ShieldCheck(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

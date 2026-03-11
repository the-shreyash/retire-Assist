import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import DocumentCard from '../components/DocumentCard';
import { FiUpload, FiFileText, FiX, FiShield } from 'react-icons/fi';

const documentTypes = [
    { value: 'aadhaar', label: '🪪 Aadhaar Card' },
    { value: 'pan', label: '💳 PAN Card' },
    { value: 'pension_id', label: '📋 Pension ID / PPO' },
    { value: 'bank_statement', label: '🏦 Bank Statement' },
    { value: 'life_certificate', label: '📜 Life Certificate' },
    { value: 'other', label: '📄 Other Document' },
];

export default function Documents() {
    const { API } = useAuth();
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [showUpload, setShowUpload] = useState(false);
    const [selectedType, setSelectedType] = useState('aadhaar');
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadResult, setUploadResult] = useState(null);

    const fetchDocs = async () => {
        try {
            const res = await API.get('/documents');
            setDocuments(res.data || []);
        } catch { }
        setLoading(false);
    };

    useEffect(() => { fetchDocs(); }, []);

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!selectedFile) return;

        setUploading(true);
        setUploadResult(null);
        const formData = new FormData();
        formData.append('document', selectedFile);
        formData.append('documentType', selectedType);

        try {
            const res = await API.post('/documents/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setUploadResult(res.data);
            setSelectedFile(null);
            setShowUpload(false);
            fetchDocs();
        } catch (err) {
            setUploadResult({ error: err.response?.data?.message || 'Upload failed' });
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this document?')) return;
        try {
            await API.delete(`/documents/${id}`);
            fetchDocs();
        } catch { }
    };

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                <div>
                    <h1 className="heading-page flex items-center gap-2">
                        <span className="text-2xl">📁</span> Document Vault
                    </h1>
                    <p className="text-text-light text-sm">Upload, store, and manage your documents securely</p>
                </div>
                <button
                    onClick={() => setShowUpload(!showUpload)}
                    className="btn-primary flex items-center gap-2 text-sm"
                >
                    {showUpload ? <><FiX size={16} /> Cancel</> : <><FiUpload size={16} /> Upload Document</>}
                </button>
            </div>

            {/* Security Banner */}
            <div className="flex items-center gap-2 p-3 bg-primary/5 border border-primary/10 rounded-lg mb-4">
                <FiShield size={16} className="text-primary flex-shrink-0" />
                <p className="text-xs text-primary font-medium">Your documents are encrypted with 256-bit security and never shared without your consent.</p>
            </div>

            {/* Upload Result */}
            {uploadResult && (
                <div className={`card mb-4 ${uploadResult.error ? 'border-danger' : 'border-success'}`}>
                    {uploadResult.error ? (
                        <p className="text-danger font-semibold text-sm">❌ {uploadResult.error}</p>
                    ) : (
                        <div>
                            <p className="text-success font-bold text-sm mb-2">✅ Document uploaded successfully!</p>
                            {uploadResult.extractedData && (
                                <div className="p-3 bg-bg rounded-lg">
                                    <p className="font-semibold text-primary text-xs mb-2">📊 OCR Extracted Data:</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
                                        {Object.entries(uploadResult.extractedData).map(([key, val]) => (
                                            typeof val === 'string' && (
                                                <div key={key}>
                                                    <span className="text-text-light capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>{' '}
                                                    <span className="font-medium">{val}</span>
                                                </div>
                                            )
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    <button onClick={() => setUploadResult(null)} className="mt-2 text-xs text-text-light hover:text-text cursor-pointer border-none bg-transparent">
                        Dismiss
                    </button>
                </div>
            )}

            {/* Upload Form */}
            {showUpload && (
                <div className="card mb-4 animate-fade-in">
                    <h3 className="text-base font-bold text-text-dark mb-3">📤 Upload New Document</h3>
                    <form onSubmit={handleUpload} className="space-y-3">
                        <div>
                            <label className="label-senior">Document Type</label>
                            <select
                                className="input-senior"
                                value={selectedType}
                                onChange={e => setSelectedType(e.target.value)}
                            >
                                {documentTypes.map(t => (
                                    <option key={t.value} value={t.value}>{t.label}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="label-senior">Choose File</label>
                            <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary transition-all">
                                <input
                                    type="file"
                                    onChange={e => setSelectedFile(e.target.files[0])}
                                    className="hidden"
                                    id="file-upload"
                                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                />
                                <label htmlFor="file-upload" className="cursor-pointer">
                                    <FiUpload size={28} className="mx-auto mb-2 text-text-light" />
                                    <p className="text-sm font-semibold text-text">
                                        {selectedFile ? selectedFile.name : 'Click to select a file'}
                                    </p>
                                    <p className="text-xs text-text-light mt-1">PDF, JPG, PNG, DOC (Max 10MB)</p>
                                </label>
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={!selectedFile || uploading}
                            className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 text-sm"
                        >
                            {uploading ? (
                                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <><FiUpload size={16} /> Upload & Extract Data</>
                            )}
                        </button>
                    </form>
                </div>
            )}

            {/* Document List */}
            {loading ? (
                <div className="flex justify-center py-16">
                    <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : documents.length === 0 ? (
                <div className="card text-center py-10">
                    <FiFileText size={40} className="mx-auto mb-3 text-text-light" />
                    <h3 className="text-lg font-bold text-text-dark mb-1">No Documents Yet</h3>
                    <p className="text-sm text-text-light mb-3">Upload your first document to get started</p>
                    <button onClick={() => setShowUpload(true)} className="btn-primary text-sm">
                        <FiUpload className="inline mr-1.5" size={14} /> Upload Document
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    {documents.map(doc => (
                        <DocumentCard key={doc._id} doc={doc} onDelete={handleDelete} />
                    ))}
                </div>
            )}
        </div>
    );
}

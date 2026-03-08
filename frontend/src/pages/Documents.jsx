import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import DocumentCard from '../components/DocumentCard';
import { FiUpload, FiFileText, FiX } from 'react-icons/fi';

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
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="heading-page flex items-center gap-3">
                        <span className="text-3xl">📁</span> Document Manager
                    </h1>
                    <p className="text-text-light text-lg">Upload, store, and manage your documents securely</p>
                </div>
                <button
                    onClick={() => setShowUpload(!showUpload)}
                    className="btn-primary flex items-center gap-2"
                >
                    {showUpload ? <><FiX size={20} /> Cancel</> : <><FiUpload size={20} /> Upload Document</>}
                </button>
            </div>

            {/* Upload Result */}
            {uploadResult && (
                <div className={`card mb-6 ${uploadResult.error ? 'border-2 border-danger' : 'border-2 border-success'}`}>
                    {uploadResult.error ? (
                        <p className="text-danger font-semibold">❌ {uploadResult.error}</p>
                    ) : (
                        <div>
                            <p className="text-success font-bold text-lg mb-2">✅ Document uploaded successfully!</p>
                            {uploadResult.extractedData && (
                                <div className="p-4 bg-bg rounded-xl">
                                    <p className="font-semibold text-primary mb-2">📊 OCR Extracted Data:</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
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
                    <button onClick={() => setUploadResult(null)} className="mt-3 text-sm text-text-light hover:text-text cursor-pointer border-none bg-transparent">
                        Dismiss
                    </button>
                </div>
            )}

            {/* Upload Form */}
            {showUpload && (
                <div className="card mb-6 animate-fade-in">
                    <h3 className="text-xl font-bold text-primary mb-4">📤 Upload New Document</h3>
                    <form onSubmit={handleUpload} className="space-y-4">
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
                            <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-accent transition-all">
                                <input
                                    type="file"
                                    onChange={e => setSelectedFile(e.target.files[0])}
                                    className="hidden"
                                    id="file-upload"
                                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                />
                                <label htmlFor="file-upload" className="cursor-pointer">
                                    <FiUpload size={40} className="mx-auto mb-3 text-text-light" />
                                    <p className="text-lg font-semibold text-text">
                                        {selectedFile ? selectedFile.name : 'Click to select a file'}
                                    </p>
                                    <p className="text-sm text-text-light mt-1">PDF, JPG, PNG, DOC (Max 10MB)</p>
                                </label>
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={!selectedFile || uploading}
                            className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {uploading ? (
                                <span className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <><FiUpload size={20} /> Upload & Extract Data</>
                            )}
                        </button>
                    </form>
                </div>
            )}

            {/* Document List */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : documents.length === 0 ? (
                <div className="card text-center py-12">
                    <FiFileText size={60} className="mx-auto mb-4 text-text-light" />
                    <h3 className="text-2xl font-bold text-text-dark mb-2">No Documents Yet</h3>
                    <p className="text-lg text-text-light mb-4">Upload your first document to get started</p>
                    <button onClick={() => setShowUpload(true)} className="btn-primary">
                        <FiUpload className="inline mr-2" /> Upload Document
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {documents.map(doc => (
                        <DocumentCard key={doc._id} doc={doc} onDelete={handleDelete} />
                    ))}
                </div>
            )}
        </div>
    );
}

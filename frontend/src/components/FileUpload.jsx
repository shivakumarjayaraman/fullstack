import { useState, useRef } from 'react';
import api from '../services/api';
import ProgressBar from './ProgressBar';

/**
 * Session 18: File upload with FormData, multipart/form-data, and upload progress.
 */
function FileUpload({ onUploaded }) {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const inputRef = useRef();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
    setResult(null);
    setProgress(0);
  };

  const handleUpload = async () => {
    if (!file) { setError('Please select a file first.'); return; }

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    setError('');
    try {
      const response = await api.post('/files/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const pct = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(pct);
        },
      });
      setResult(response.data);
      onUploaded?.(response.data);
      setFile(null);
      if (inputRef.current) inputRef.current.value = '';
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px' }}>
      <h3>Upload File</h3>
      <input ref={inputRef} type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading || !file} style={{ marginTop: '0.5rem', display: 'block' }}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {uploading && <ProgressBar value={progress} label="Progress" />}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result && (
        <p style={{ color: 'green' }}>
          Uploaded: <a href={result.fileDownloadUri} target="_blank" rel="noreferrer">{result.fileName}</a>
        </p>
      )}
    </div>
  );
}

export default FileUpload;

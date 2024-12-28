export const uploadFile = async (file, onProgress) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('YOUR_UPLOAD_API_ENDPOINT', {
      method: 'POST',
      body: formData,
      headers: {
        // Remove Content-Type header to let the browser set it with boundary
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // If using auth
      },
      // Enable upload progress tracking
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onProgress(percentCompleted);
      },
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const data = await response.json();
    return data.fileUrl; // Assuming your API returns the uploaded file URL
  } catch (error) {
    throw new Error('Error uploading file: ' + error.message);
  }
}; 
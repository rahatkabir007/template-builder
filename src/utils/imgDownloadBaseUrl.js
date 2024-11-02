export const downloadBlob = (blob, saveAs) => {
    const fileUrl = window.URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = fileUrl;
    anchor.download = saveAs;
    anchor.style.display = "none";
    document.body.appendChild(anchor);
    anchor.click();
    window.URL.revokeObjectURL(fileUrl);
    document.body.removeChild(anchor);
};
import axios from "axios";

const ExportarPdf = () => {
    const exportarPdf = () => {
      axios
        .get(
          "http://127.0.0.1:8000/api/export/pdf/",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "produtos.pdf");
          document.body.appendChild(link);
          link.click();
        })
        .catch((error) => console.error(error));
    };
  
    return <button onClick={exportarPdf} className="export-button">PDF</button>;
  };
  
  export default ExportarPdf;
  
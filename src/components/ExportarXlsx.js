import axios from "axios";

const ExportarXlsx = () => {
    const exportarXlsx = () => {
      axios
        .get(
          "http://127.0.0.1:8000/api/export/xlsx/",
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
          link.setAttribute("download", "produtos.xlsx");
          document.body.appendChild(link);
          link.click();
        })
        .catch((error) => console.error(error));
    };
  
    return <button onClick={exportarXlsx} className="export-button">XLSX</button>;
  };
  
  export default ExportarXlsx;
  
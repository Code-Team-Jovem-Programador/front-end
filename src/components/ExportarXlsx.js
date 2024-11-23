import axios from "axios";

const ExportarXlsx = () => {
    const exportarXlsx = () => {
      axios
        .post(
          "https://gerenciador-estoque-prod.onrender.com/api/export/xlsx/",
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
  
    return <button onClick={exportarXlsx}>Exportar para XLSX</button>;
  };
  
  export default ExportarXlsx;
  
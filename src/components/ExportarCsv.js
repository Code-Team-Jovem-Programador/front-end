import axios from "axios";

const ExportarCsv = () => {
  const exportarCsv = () => {
    axios
      .post(
        "https://gerenciador-estoque-prod.onrender.com/api/export/csv/",
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
        link.setAttribute("download", "produtos.csv");
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => console.error(error));
  };

  return <button onClick={exportarCsv}>Exportar para CSV</button>;
};

export default ExportarCsv;

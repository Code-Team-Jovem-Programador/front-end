import axios from "axios";

const ExportarXlsx = () => {
  const exportarXlsx = () => {
    axios
      .get("http://127.0.0.1:8000/api/export/xlsx/", {
        responseType: "blob", // Certifique-se de especificar o tipo de resposta
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Produtos.xlsx");
        document.body.appendChild(link);
        link.click();
        link.remove(); // Remove o link do DOM após o clique
      })
      .catch((error) => console.error("Erro ao exportar o arquivo:", error));
  };

  return <button onClick={exportarXlsx}>Exportar para XLSX</button>;
};

export default ExportarXlsx;

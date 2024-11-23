const ExportarPdf = () => {
    const exportarPdf = () => {
      axios
        .post(
          "https://gerenciador-estoque-prod.onrender.com/api/export/pdf/",
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
  
    return <button onClick={exportarPdf}>Exportar para PDF</button>;
  };
  
  export default ExportarPdf;
  
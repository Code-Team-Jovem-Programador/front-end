import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const ActivateAccount = () => {
    const [searchParams] = useSearchParams();
    const uidb64 = searchParams.get("uidb64");
    const token = searchParams.get("token");

    useEffect(() => {
        const activateAccount = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/activate/${uidb64}/${token}/` 
                );            
            // try {
            //     const response = await axios.get(
            //         `https://gerenciador-estoque-prod.onrender.com/api/activate/${uidb64}/${token}/` 
            //     );
                alert("Conta ativada com sucesso!");
            } catch (error) {
                alert("Erro ao ativar conta. Link inválido ou expirado.");
            }
        };

        if (uidb64 && token) {
            activateAccount();
        }
    }, [uidb64, token]);

    return <div>Ativando sua conta...</div>;
};

export default ActivateAccount;

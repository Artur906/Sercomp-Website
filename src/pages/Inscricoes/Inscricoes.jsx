import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa"; // Importe o ícone de Spinner
import { ToastContainer, toast } from "react-toastify";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import { api } from "../../lib/axios";

import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Inscricoes.module.css";

const Inscricoes = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm({
    mode: "all",
  });

  const [atividades, setAtividades] = useState({
    minicursos: [],
    oficinas: [],
    workshops: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  const [lotes, setLotes] = useState([]);

  const selectedLote = watch("lote");

  async function fecthApiData() {
    try {
      const atividadesPromise = api.get(
        `/events/${import.meta.env.VITE_EVENTO_UUID}/atividades`
      );
      const lotesPromise = api
        .get(`/events/${import.meta.env.VITE_EVENTO_UUID}/lotes`)

      const [atividadesResponse, lotesResponse] = await Promise.all([
        atividadesPromise,
        lotesPromise
      ]);

      setAtividades(atividadesResponse.data);
      setLotes(lotesResponse.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      toast.error("Erro ao buscar dados da API");
    }
  }

  useEffect(() => {
    fecthApiData();
  }, []);

  async function onSubmit(data) {
    const workshop_id = data.workshop;
    const minicurso_id = data.oficina;
    const oficina_id = data.minicurso;

    const { nome, nome_cracha, email, instituicao, lote } = data;

    if (!lote) {
      toast.error("O lote é obrigatório!");
    }

    const requestData = {
      nome,
      nome_cracha,
      email,
      instituicao,
      atividades: [workshop_id, minicurso_id, oficina_id],
      lote_id: lote || lotes[0].uuid_lote,
    };

    try {
      const { data } = await api.post(
        `/register/${import.meta.env.VITE_EVENTO_UUID}`,
        requestData
      );

      toast.success("Inscrição realizada!");
      await new Promise((r) => setTimeout(r, 3000));

      navigate(`/pagamento/user/${data.uuid_user}/lote/${selectedLote}`);
    } catch (error) {
      console.log(error);
      toast.error("Erro ao criar inscrição ou link de pagamento");
    }
  }

  return (
    <section className={styles.container}>
      <ToastContainer autoClose={1500} />
      <h1 className="titulo-principal">
        <strong>Inscrição</strong>
      </h1>

      {isLoading ? (
        <LoadingScreen />
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.formContainer}
        >
          <div className={styles.inputGroup}>
            <div>
              <p>Nome</p>
              <input
                disabled={isSubmitting}
                required
                type="text"
                placeholder="Nome"
                {...register("nome", { required: true })}
              />
            </div>
            <div>
              <p>Nome no crachá</p>
              <input
                disabled={isSubmitting}
                required
                type="text"
                placeholder="Nome no crachá"
                {...register("nome_cracha", { required: true })}
              />
            </div>
            <div>
              <p>E-mail</p>
              <input
                disabled={isSubmitting}
                required
                type="email"
                placeholder="Email"
                {...register("email", { required: true })}
              />
            </div>
            <div>
              <p>Instituição</p>
              <input
                disabled={isSubmitting}
                required
                type="text"
                placeholder="Instituição"
                {...register("instituicao", { required: true })}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <p>Selecione o lote</p>
            <div className={styles.inputGroupLotes}>
              {lotes.map((lote) => (
                <label
                  key={lote.uuid_lote}
                  htmlFor={lote.uuid_lote}
                  className={`${styles.loteContainer} ${
                    selectedLote === lote.uuid_lote
                      ? styles.loteContainerChecked
                      : ""
                  }`}
                >
                  <div className={styles.loteContent}>
                    {lote.nome} <br /> <span> Valor - R${lote.preco}</span>{" "}
                  </div>
                  <input
                    id={lote.uuid_lote}
                    type="radio"
                    value={lote.uuid_lote}
                    checked={selectedLote === lote.uuid_lote}
                    disabled={isSubmitting}
                    {...register("lote")}
                  />
                </label>
              ))}
            </div>
          </div>

          <div className={styles.selectContainer}>
            <div className={styles.selectGroup}>
              <p>Minicursos</p>
              <select {...register("minicurso")}>
                <option value="">Selecione...</option>
                {atividades.minicursos.map((minicurso) => (
                  <option
                    key={minicurso.uuid_atividade}
                    value={minicurso.uuid_atividade}
                  >
                    {minicurso.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.selectGroup}>
              <p>Workshops</p>
              <select {...register("workshop")}>
                <option value="">Selecione...</option>
                {atividades.workshops.map((workshop) => (
                  <option
                    key={workshop.uuid_atividade}
                    value={workshop.uuid_atividade}
                  >
                    {workshop.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.selectGroup}>
              <p>Oficinas</p>
              <select {...register("oficina")}>
                <option value="">Selecione...</option>
                {atividades.oficinas.map((oficina) => (
                  <option
                    key={oficina.uuid_atividade}
                    value={oficina.uuid_atividade}
                  >
                    {oficina.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.submitButtonContainer}>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <FaSpinner className={styles.spinner} />
                  Aguarde...
                </>
              ) : (
                "Inscrever-se"
              )}
            </button>
          </div>
        </form>
      )}
    </section>
  );
};

export default Inscricoes;

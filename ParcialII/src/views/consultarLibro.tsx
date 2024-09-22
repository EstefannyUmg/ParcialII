import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import ApiServices from "../services/ApiServices";
import Botones from "../components/Botones";

interface iRespuesta {
    sId: string;
    sTitle: string;
    sContent: string;
    sAuthor: string;
    sDate: string;
    sCategory: string;
}

function ConsultaLibro() {
    const [searchParams, setSearchParams] = useState<iRespuesta | null>(null);

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<iRespuesta>();

    const onSubmit: SubmitHandler<iRespuesta> = (data) => {
        setSearchParams({ ...data, sTitle: "", sContent: "", sAuthor: "", sDate: "", sCategory: "" });
    };

    const handleResult = (data: { title: string; content: string; author: string; date: string; category: string }) => {
        setSearchParams((prev) =>
            prev
                ? {
                      ...prev,
                      sTitle: data.title,
                      sContent: data.content,
                      sAuthor: data.author,
                      sDate: data.date,
                      sCategory: data.category,
                  }
                : null
        );
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={{ fontFamily: "Product Sans", fontSize: "25px" }}>
            <div className="card w-100 shadow-lg rounded-4 position-relative" style={{ maxWidth: "800px", backgroundColor: "#ffffff" }}>
                <div className="card-body">
                    <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                        <div className="col-12 col-md-8 col-lg-6 mx-auto">
                            <h1 className="text-center mb-4 text-primary">Consulta de Libros</h1>
                        </div>

                        {}
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="txtId">Id:</label>
                                <input
                                    id="txtId"
                                    className={`form-control rounded-4 ${errors.sId ? "is-invalid" : ""}`}
                                    type="text"
                                    {...register("sId", { required: true })}
                                />
                                {errors.sId?.type === "required" && (
                                    <div className="invalid-feedback">
                                        <span>Es obligatorio llenar este campo</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="txtTitle">Título:</label>
                                <input
                                    id="txtTitle"
                                    className="form-control rounded-4"
                                    type="text"
                                    disabled
                                    value={searchParams?.sTitle || ""}
                                />
                            </div>
                        </div>

                        {}
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="txtAuthor">Autor:</label>
                                <input
                                    id="txtAuthor"
                                    className="form-control rounded-4"
                                    type="text"
                                    disabled
                                    value={searchParams?.sAuthor || ""}
                                />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="txtCategory">Categoría:</label>
                                <input
                                    id="txtCategory"
                                    className="form-control rounded-4"
                                    type="text"
                                    disabled
                                    value={searchParams?.sCategory || ""}
                                />
                            </div>
                        </div>

                        {}
                        

                        <div className="col-12 text-center">
                            <div className="d-inline-flex">
                                <Botones texto="Consultar" onClick={handleSubmit(onSubmit)} />
                            </div>
                        </div>
                    </form>

                    {searchParams && (
                        <ApiServices sId={searchParams.sId} onResult={handleResult} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default ConsultaLibro;

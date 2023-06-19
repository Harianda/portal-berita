import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, Head } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

export default function Dashboard(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");

    const handleSubmit = () => {
        const data = {
            title,
            description,
            category,
        };
        Inertia.post("/news", data);
        setTitle("");
        setDescription("");
        setCategory("");
    };

    useEffect(() => {
        if (!props.myNews) {
            Inertia.get("/news");
        }
        return;
    }, []);

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Berita Saya
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div data-theme="light" className="py-12 bg-slate-100">
                <div className="mx-10 bg-white overflow-hidden shadow-sm rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        {props.flash.message && (
                            <div className="alert alert-info">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="stroke-current shrink-0 w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    ></path>
                                </svg>
                                <span> {props.flash.message}</span>
                            </div>
                        )}

                        <input
                            type="text"
                            placeholder="Judul"
                            className="m-2 input input-bordered w-full"
                            onChange={(title) => setTitle(title.target.value)}
                            value={title}
                        />
                        <input
                            type="text"
                            placeholder="Deskripsi"
                            className="m-2 input input-bordered w-full"
                            onChange={(description) =>
                                setDescription(description.target.value)
                            }
                            value={description}
                        />
                        <input
                            type="text"
                            placeholder="Kategori"
                            className="m-2 input input-bordered w-full"
                            onChange={(category) =>
                                setCategory(category.target.value)
                            }
                            value={category}
                        />
                        <button
                            className="btn btn-primary m-2"
                            onClick={() => handleSubmit()}
                        >
                            Submit
                        </button>
                    </div>
                </div>
                <div className="">
                    {props.myNews && props.myNews.length > 0 ? (
                        props.myNews.map((news, i) => {
                            return (
                                <div
                                    className="card w-full lg:w-96 bg-base-100 shadow-xl py m-2"
                                    key={news.id}
                                >
                                    <div className="card-body">
                                        <h2 className="card-title">
                                            {news.title}
                                            <div className="badge badge-secondary">
                                                NEW
                                            </div>
                                        </h2>
                                        <p>{news.description}</p>
                                        <div className="card-actions justify-end">
                                            <div className="badge badge-inline bg-slate-800 text-white">
                                                {news.category}
                                            </div>
                                            <div className="badge badge-outline">
                                                <Link
                                                    href={route("edit.news")}
                                                    method="get"
                                                    data={{ id: news.id }}
                                                    as="button"
                                                >
                                                    Edit
                                                </Link>
                                            </div>
                                            <div className="badge badge-outline">
                                                <Link
                                                    href={route("delete.news")}
                                                    method="post"
                                                    data={{ id: news.id }}
                                                    as="button"
                                                >
                                                    Delete
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p>Anda belum memiliki Berita</p>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

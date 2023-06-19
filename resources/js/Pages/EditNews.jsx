import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import { Inertia } from "@inertiajs/inertia";

export default function EditNews(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");

    const handleSubmit = () => {
        const data = {
            id: props.myNews.id,
            title,
            description,
            category,
        };
        Inertia.post("/news/update", data);
        setTitle("");
        setDescription("");
        setCategory("");
    };

    console.log("ini props:", props);

    return (
        <div data-theme="light" className="min-h-screen bg-slate-50">
            <Head title={props.title} />
            <Navbar user={props.auth.user} />
            <div className="mx-10 bg-white overflow-hidden shadow-sm rounded-lg">
                <div className="p-6 bg-white border-b border-gray-200">
                    <input
                        type="text"
                        placeholder="Judul"
                        className="m-2 input input-bordered w-full"
                        onChange={(title) => setTitle(title.target.value)}
                        defaultValue={props.myNews.title}
                    />
                    <input
                        type="text"
                        placeholder="Deskripsi"
                        className="m-2 input input-bordered w-full"
                        onChange={(description) =>
                            setDescription(description.target.value)
                        }
                        defaultValue={props.myNews.description}
                    />
                    <input
                        type="text"
                        placeholder="Kategori"
                        className="m-2 input input-bordered w-full"
                        onChange={(category) =>
                            setCategory(category.target.value)
                        }
                        defaultValue={props.myNews.category}
                    />
                    <button
                        className="btn btn-primary m-2"
                        onClick={() => handleSubmit()}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

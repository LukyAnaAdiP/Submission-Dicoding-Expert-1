import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { asyncCreateThread } from "../states/threads/actions";

function CreateThreadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isCreating, createError } = useSelector((state) => state.threads);

  const [formData, setFormData] = useState({
    title: "",
    body: "",
    category: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const resultAction = await dispatch(
      asyncCreateThread({
        title: formData.title,
        body: formData.body,
        category: formData.category,
      }),
    );

    if (asyncCreateThread.fulfilled.match(resultAction)) {
      navigate("/");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Buat Thread</h1>

          <p className="mt-2 text-slate-500">
            Bagikan pertanyaan atau topik yang ingin kamu diskusikan.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          {createError && (
            <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-600">
              {createError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Judul
              </label>

              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Contoh: Bagaimana cara belajar Redux?"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Kategori
              </label>

              <input
                id="category"
                name="category"
                type="text"
                value={formData.category}
                onChange={handleChange}
                placeholder="Contoh: redux"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="body"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Isi Thread
              </label>

              <textarea
                id="body"
                name="body"
                value={formData.body}
                onChange={handleChange}
                required
                rows={8}
                placeholder="Tuliskan isi thread kamu..."
                className="w-full resize-y rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="rounded-lg border border-slate-300 px-5 py-2.5 font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Batal
              </button>

              <button
                type="submit"
                disabled={isCreating}
                className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isCreating ? "Menerbitkan..." : "Terbitkan Thread"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default CreateThreadPage;

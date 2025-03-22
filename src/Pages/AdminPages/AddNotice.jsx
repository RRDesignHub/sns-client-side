import React, { useState } from "react";
import Swal from "sweetalert2";
import { useAxiosSec } from "../../Hooks/useAxiosSec";

export default function AddNotice() {
  const axiosSecure = useAxiosSec();
  const [title, setTitle] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const noticeData = {
      title: title, // Explicitly use state values
      pdfUrl:pdfUrl,
      date: date,
    };

    try {
      const {data} = await axiosSecure.post(`/add-notice`, noticeData);
      if (data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Notice added successfully!!!`,
          showConfirmButton: false,
          timer: 1500,
        });
        form.reset();
        setTitle("");
        setPdfUrl("");
        setDate(new Date().toISOString().split("T")[0]);
      }
    } catch (err) {
      console.log("Notice adding error -->", err);
    }
  };
  return (
    <div className="w-11/12 mx-auto my-10">
      <form
        onSubmit={handleSubmit}
        className="card-body max-sm:px-3 bg-green-200 rounded-2xl py-5 md:py-8"
      >
        <h2 className="text-2xl md:text-4xl text-green-950 font-bold text-center">
          Add Notice
        </h2>
        <div className="divider my-0"></div>

        {/* title */}
        <div className="form-control col-span-6 md:col-span-2">
          <label className="label">
            <span className="label-text">Notice Title</span>
          </label>
          <input
            type="text"
            placeholder="Notice Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            required
          />
        </div>
        {/* pdf url */}
        <div className="form-control col-span-6 md:col-span-2">
          <label className="label">
            <span className="label-text">Notice PDF URL</span>
          </label>
          <input
            type="url"
            placeholder="Notice File Link"
            value={pdfUrl}
            onChange={(e) => setPdfUrl(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            required
          />
        </div>

        {/* date */}
        <div className="form-control col-span-6 md:col-span-2">
          <label className="label">
            <span className="label-text">Notice Publish Date</span>
          </label>
          <input
            type="date"
            selected={date}
            required
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="btn bg-green-600 px-5 hover:bg-green-700 md:text-lg text-white"
        >
          Add Notice
        </button>
      </form>
    </div>
  );
}

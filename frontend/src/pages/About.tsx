export default function About() {
  return (
    <div className="min-h-screen bg-white text-black">

      {/* HERO */}
      <section className="bg-[#0b1c33] text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About JNTUK Placement team
          </h1>
          <p className="text-white/70 text-lg">
            Bridging the gap between academia and industry since 2008
          </p>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT SIDE (TEXT) */}
          <div>
            <h2 className="text-4xl font-bold text-[#0b1c33] mb-4 ">
              Placement Team
            </h2>

            <p className="text-slate-700 leading-relaxed space-y-2">
              <div className="text-2xl font-semibold text-[#0b1c33]">Dr. E. Suneetha</div>
              <div className="text-lg text-slate-600">Training & Placement Officer</div>
              <div className="text-lg text-slate-600">Associate Professor, CSE</div>
              <div className="text-lg text-blue-600 font-medium">placementofficer@jntucek.edu.in</div>
            </p>

            <p className="text-gray-600 text-lg mt-4">
            </p>
          </div>

          {/* RIGHT SIDE (IMAGE) */}
          <div>
              <img
              src="https://www.jntucek.ac.in/dashboard/uploads/placement/teamteam_1772704708_2f01df727ab7c146.jpg"
              alt="Placement Team"
              className="w-full h-[600px] object-cover rounded-xl shadow-lg"
              
              />
          </div>

        </div>
      </section>

    </div>
  );
}
import React, { useState } from "react";
import './contact.css'
function Contact() {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    subject: "",
  });

  const [submittedData, setSubmittedData] = useState(null);

  // تحديث البيانات أثناء الكتابة في الحقول
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // التعامل مع الإرسال
  const handleSubmit = (e) => {
    e.preventDefault(); // منع إعادة تحميل الصفحة
    setSubmittedData(formData); // تحديث البيانات المقدمة
  };

  return (
    <div>
      <h2>Contactez-nous</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fname">Nom:</label>
        <input
          type="text"
          id="fname"
          name="fname"
          className="form-input"
          placeholder="Entrez votre nom"
          value={formData.fname}
          onChange={handleChange}
        />

        <label htmlFor="lname">Prénom:</label>
        <input
          type="text"
          id="lname"
          name="lname"
          className="form-input"
          placeholder="Entrez votre prénom"
          value={formData.lname}
          onChange={handleChange}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-input"
          placeholder="Entrez votre email"
          value={formData.email}
          onChange={handleChange}
        />

        <label htmlFor="subject">Objet:</label>
        <textarea
          id="subject"
          name="subject"
          className="form-textarea"
          placeholder="Expliquez-nous votre requête"
          value={formData.subject}
          onChange={handleChange}
        ></textarea>

        <input type="submit" value="Envoyer" className="form-submit" />
      </form>

      {/* عرض البيانات المقدمة */}
      {submittedData && (
        <div className="submitted-data">
          <h3>Informations Soumises:</h3>
          <p><strong>Nom:</strong> {submittedData.fname}</p>
          <p><strong>Prénom:</strong> {submittedData.lname}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Objet:</strong> {submittedData.subject}</p>
        </div>
      )}
    </div>
  );
}

export default Contact;

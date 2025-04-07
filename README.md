<p align="center">
  <img src="./screenshots/A_logo_for_an_e-commerce_website_focused_on_toys_i.png" width="200" alt="Ecommerce Website Logo" />
</p>

# 🧸 E-commerce Website – Toy Store

A full-stack **e-commerce website** built with **Django**, **React**, and **PostgreSQL**, designed for selling toys online. This platform features a clean, responsive UI and a powerful backend, and it is set up for future deployment on **AWS**.

---

## 🏷️ Badges

![Made with Django](https://img.shields.io/badge/Backend-Django-092E20?style=for-the-badge&logo=django)
![Made with React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react)
![Database](https://img.shields.io/badge/Database-PostgreSQL-336791?style=for-the-badge&logo=postgresql)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-In_Progress-orange?style=for-the-badge)

---

## 📦 Project Overview

**Ecommerce Website** is an online store focused on selling toys. Users can browse a curated selection of toys, add products to their cart, and securely place orders. The project demonstrates full-stack development using modern web technologies and is structured for scalability and cloud deployment.

---

## 🚀 Tech Stack

- **Frontend**: React (Vite) + Tailwind CSS  
- **Backend**: Django + Django REST Framework  
- **Database**: PostgreSQL  
- **Auth**: Session-based (JWT planned)  
- **Deployment Target**: AWS (EC2, S3, RDS)  

---

## ✨ Features

- 🧸 Toy-focused product catalog  
- 👤 User authentication and profile  
- 🛒 Shopping cart & checkout flow  
- 📦 Order history & tracking  
- 🧑‍💻 Admin panel (Django admin)  
- 📱 Responsive design for all devices  
- 🔒 Secure backend API with DRF  
- 💳 *(Planned)* Stripe/PayPal integration  
- ☁️ *(Planned)* AWS cloud deployment  

---

## 🛠️ Getting Started

### Backend (Django)
```bash
git clone https://github.com/CeciliaMutero/Ecommerce-website.git
cd Ecommerce-website/ecommerce_project
python -m venv env
source env/bin/activate  # For Windows: env\Scripts\activate
pip install -r requirements.txt
# Set up your PostgreSQL database and update settings.py
python manage.py migrate
python manage.py runserver

Frontend (React)
cd ../ecommerce-frontend
npm install
npm run dev

🖼️ Screenshots

.

🌐 Deployment Plans
EC2: Backend hosting

S3: Static/media file hosting

RDS: PostgreSQL database

GitHub Actions: CI/CD pipeline (planned)

HTTPS + Custom Domain: (optional) via Route53 & CloudFront

🙌 Contributing
Have a suggestion or improvement? Contributions are welcome!
Please fork the repo, create a branch, and open a pull request.

📬 Contact
Cecilia Mutero
GitHub: @CeciliaMutero
Email: cecilmutero66@gmail.com





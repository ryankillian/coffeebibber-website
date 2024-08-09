# CoffeeBibber Website

Welcome to [CoffeeBibber](https://coffeebibber.com), an artisan coffee review platform.

## Project Overview

CoffeeBibber is a full-stack CRUD application designed to showcase my technical skills. The website is deployed on AWS and leverages a range of modern technologies to ensure robust performance and scalability.

## Tech Stack

### Cloud Infrastructure

- **AWS EC2**: Hosting the application.
- **AWS Simple Email Service (SES)**: Handling email communications.
- **AWS Route 53**: Domain name service for routing traffic.
- **AWS Certificate Manager**: Managing SSL/TLS certificates.

### Containerization & Orchestration

- **Docker**: Containerizing the application components.
- **Docker Compose**: Managing multi-container Docker applications.

### Web Server

- **Nginx Proxy Manager**: Managing and securing web traffic, deployed via Docker.

### Backend

- **Pocketbase**: Lightweight and fast backend for the application, deployed via Docker.

### Frontend

- **SvelteKit**: Fast and modern frontend framework, running on Node.js, deployed via Docker.

## Deployment

The CoffeeBibber website is deployed on an AWS EC2 instance, using Docker and Docker Compose to manage the application stack. Nginx Proxy Manager is used to manage incoming traffic and ensure security with SSL/TLS encryption provided by Let's Encrypt and AWS Certificate Manager.

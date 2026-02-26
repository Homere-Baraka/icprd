# Documentation des Modèles Prisma - ICPRD

Cette documentation explique les **modèles de données Prisma** utilisés pour le site web et le dashboard admin d’ICPRD, avec un focus sur les **relations importantes** et l’**utilisation de chaque modèle**.

---

## 1. Modèle `User`

**Description**  
Représente les utilisateurs du système (administrateurs, contributeurs, utilisateurs classiques).

**Utilisation**  
- Gestion des comptes et authentification.  
- Permissions via le champ `role` (`USER`, `CONTRIBUTOR`, `ADMIN`).  

**Relations principales**  
- `Profile` (1:1) : informations détaillées de l’utilisateur.  
- `Account` et `Session` (1:N) : gestion de l’authentification et des sessions.  
- `Post` (1:N) : un utilisateur peut créer des articles.  
- `Team` (1:1 optionnel) : relie un utilisateur admin à un membre de l’équipe pour gérer le contenu.

---

## 2. Modèle `Team`

**Description**  
Représente les membres de l’équipe affichés sur le site web.

**Utilisation**  
- Affichage des informations de l’équipe (nom, rôle, photo, réseaux sociaux).  
- Coordination des posts et témoignages sur le site.  

**Relations principales**  
- `User` (1:1 optionnel) : un membre peut être lié à un utilisateur pour gérer le contenu depuis le dashboard.  
- `Post` (1:N) : un membre peut être auteur de plusieurs posts.  
- `Testimonials` (1:N) : un membre peut être auteur de plusieurs témoignages.

---

## 3. Modèle `Post`

**Description**  
Stocke les articles ou rapports publiés sur le site (“Derniers rapports / Blog”).

**Utilisation**  
- Contenu, image et catégorie de chaque article.  
- Suivi du nombre de vues et date de publication.

**Relations principales**  
- `Team` (1:1 optionnel) : identifie l’auteur du post.  
- `Testimonials` (1:N) : associe des témoignages à l’article.

---

## 4. Modèle `Testimonials`

**Description**  
Témoignages ou retours sur des projets ou posts.

**Utilisation**  
- Permet de valoriser les actions de l’organisation sur le site.  

**Relations principales**  
- `Post` (1:1 optionnel) : indique le post auquel le témoignage est rattaché.  
- `Team` (1:1 optionnel) : indique le membre de l’équipe auteur du témoignage.


## 5. Modèle `Achievement`

**Description**  
Représente les réalisations et projets de l’organisation.

**Utilisation**  
- Affichage des projets et réussites sur le site.  

**Relations principales**  
- `Team` (1:1 optionnel) : relie à un admin ou un membre de l’équipe pour gérer le contenu..

## 6. Modèle `Gallery`

**Description**  
Stocke les images pour les galeries du site.

**Utilisation**  
- Illustrer les actions et événements de l’organisation.

**Relations principales**  
- **Aucune relation directe**.

## 7. Modèle `Partner`

**Description**  
Stocke les partenaires de l’organisation.

**Utilisation**  
- Affichage des logos et informations des partenaires sur le site.

**Relations principales**  
- **Aucune relation directe**.

## 8. Modèle `ContactMessage`

**Description**  
Messages envoyés via le formulaire de contact du site.

**Utilisation**  
- Gestion des messages des visiteurs via le dashboard admin.  

**Relations principales**  
- **Aucune relation directe**.

## 9. Modèles futurs pour l’authentification

- **`Session`** : gère les sessions utilisateur (1:N avec `User`).  
- **`VerificationToken`** : vérifie les emails et tokens de sécurité (1:N avec `User`).  

**Utilisation**  
- Sécuriser et gérer les connexions et vérifications des utilisateurs.

## Remarques générales

- Les relations **User ↔ Team** permettent de lier un membre d’équipe à un utilisateur admin pour la gestion du contenu.  
- Les relations **Post ↔ Testimonials** et **Team ↔ Post/Testimonials/Achievement/Gallery/Partner** permettent d’afficher clairement l’auteur et les contenus associés sur le site.
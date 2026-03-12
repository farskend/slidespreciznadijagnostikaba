## Plan: Slides Portal za PreciznaDijagnostika

Na osnovu uploadovanog screenshota, kreirat cu portal sa slicnim dizajnom (bijela pozadina, tamni tekst, ljubicasti akcenti) ali prilagoden za slides.preciznadijagnostika.ba.

### Dizajn elementi (iz screenshota)

- **Boje**: Bijela pozadina, tamno sivi tekst, ljubicasti gradient (#7C3AED → #A855F7) za akcente
- **Font**: Čist, moderan sans-serif
- **Stil**: Minimalistički, puno white-space
- **Logo**: Korisnik će uploadati

### Struktura aplikacije

**1. Login stranica (`/login`)**

- Minimalistički login form sa logom
- Hardkodirani credentials (faruk/stroma19 i fisnik/mikro19)
- Čuva ulogu u localStorage

**2. Admin dashboard (`/admin`)**

- Header sa logom i logout dugmetom
- Form za unos embed URL-a
- Prikaz trenutnog URL-a sa opcijom brisanja/editovanja
- URL se cuva u localStorage

**3. User dashboard (`/dashboard`)**

- Header sa logom i logout dugmetom
- Fullscreen iframe koji prikazuje embed URL koji je admin postavio
- Poruka ako nema postavljenog linka

**4. Auth guard**

- ProtectedRoute komponenta koja provjerava login status
- Redirect na /login ako korisnik nije ulogovan

### Fajlovi za kreiranje/editovanje


| Fajl                                | Opis                       |
| ----------------------------------- | -------------------------- |
| `src/pages/Login.tsx`               | Login stranica sa formom   |
| `src/pages/AdminDashboard.tsx`      | Admin panel za embed URL   |
| `src/pages/UserDashboard.tsx`       | Iframe prikaz za korisnika |
| `src/components/ProtectedRoute.tsx` | Auth guard komponenta      |
| `src/components/Header.tsx`         | Zajednicki header sa logom |
| `src/hooks/useAuth.ts`              | Auth hook (localStorage)   |
| `src/App.tsx`                       | Rute                       |
| `src/index.css`                     | Ljubicaste boje            |


### Autentikacija (localStorage, bez baze)

- Admin: `faruks` / `stroma19`
- Korisnik: `fisnik` / `mikro19`
- Login cuva `{ role, username }` u localStorage
- Admin ide na `/admin`, korisnik na `/dashboard`
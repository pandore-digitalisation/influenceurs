// const Dashboard = () => {
//   const router = useRouter();
//   const { token } = router.query;
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     if (token) {
//       // Vérifie le token côté serveur
//       fetch('http://localhost:3000/auth/google/callback', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ token }),
//       })
//         .then(response => response.json())
//         .then(data => {
//           if (data.success) {
//             setUser(data.user);
//           } else {
//             router.push('/login'); // Redirige si non authentifié
//           }
//         });
//     }
//   }, [token]);

//   if (!user) {
//     return <div>Chargement...</div>;
//   }

//   return (
//     <div>
//       <h1>Bienvenue</h1>
//       <p>Email</p>
//     </div>
//   );
// };

// export default Dashboard;

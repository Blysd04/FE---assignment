// import logo from './logo.svg';
import './App.css';
import Header from './components/header';
// import Product from './components/product';
import NotFound from './components/notFound';
import Home from './components/home';
import Cart from './components/cart';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import CheckOrder from './components/checkOrder';

function App() {
  var users = [{
    id: 1,
    userName: 'Admin01',
    password: 'admin0102',
    role: 'admin'
  },
  {
    id: 2,
    userName: 'Customer01',
    password: 'customer0102',
    role: 'customer'
  },
  {
    id: 3,
    role: 'none'
  }
  ]
  var products = [{
    id: 1,
    name: "Pink Hatsume Miku",
    price: 75000,
    image: "https://img.lazcdn.com/g/p/bf6c6ac8ef34b7fd7997d3acd64a6f1e.jpg_720x720q80.jpg_.webp",
    description: 'Đẹp, giá hời, dễ mang đi khắp nơi, có thể trưng bày ở nhiều nơi',
    status: true,
    quantityCart: 0
  },
  {
    id: 2,
    name: "Haibara Ai Detective Conan GSC Q",
    price: 280000,
    image: "https://img.lazcdn.com/g/p/eba35a16a490f76856c57c9b4c89c295.jpg_720x720q80.jpg_.webp",
    description: 'Đẹp, giá hời, dễ mang đi khắp nơi, có thể trưng bày ở nhiều nơi',
    status: true,
    quantityCart: 0
  },
  {
    id: 3,
    name: "Figure Uzumaki Naruto && Kakashi",
    price: 48000,
    image: "https://img.lazcdn.com/g/p/145fdd8518d0d497b0044dec0ac4fb23.jpg_720x720q80.jpg_.webp",
    description: 'Đẹp, giá hời, dễ mang đi khắp nơi, có thể trưng bày ở nhiều nơi',
    status: true,
    quantityCart: 0
  },
  {
    id: 4,
    name: "Figure Ram && Rem",
    price: 82000,
    image: "https://img.lazcdn.com/g/p/8ceef4f769e86b50e69c1c793b9bcde1.jpg_720x720q80.jpg_.webp",
    description: 'Đẹp, giá hời, dễ mang đi khắp nơi, có thể trưng bày ở nhiều nơi',
    status: true,
    quantityCart: 0
  },
  ]

  const [currentUser, setCurrentUser] = useState(users[2]); // Mặc định là user 'none'
  const [allUsers, setAllUsers] = useState(users);

  const handleLogin = (userName, password) => {
    const user = allUsers.find(u => u.userName === userName && u.password === password);
    if (user) {
      setCurrentUser(user);
    } else {
      alert('Invalid username or password!');
    }
  };
  const handleLogout = () => {
    setCurrentUser(users[2]);
    alert('Log out successfully!');

  }
  const handleSignup = (newUser) => {
    setAllUsers([...allUsers, newUser]);
    setCurrentUser(newUser);
    alert('Sign up successfully!');
  };

  return (
    <div className="App">
      <Header user={currentUser} login={handleLogin} logout={handleLogout} signup={handleSignup} />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home productList={products} user={currentUser} />} />
        <Route path="/cart" element={<Cart productList={products} />} />
        <Route path="/check-order" element={<CheckOrder productList={products} />} />
      </Routes>
    </div>
  );
}

export default App;

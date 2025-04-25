import React from 'react';
import styles from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate(); // ✅ Fixed: Call useNavigate() correctly

    return (
        <div>
            <ul className={styles.topUl}>
                <li>
                    <Link to="/">Home</Link> {/* ✅ Fixed: Corrected 'to' */}
                </li>
                <li>
                    <p>Categories</p>
                    {/* ✅ Fixed: Wrapped <ul> inside <li> */}
                    <ul className={styles.bottomUl}>
                        <li onClick={() => navigate("/categories", { state: { category: "business" } })}>
                            Business
                        </li>
                        <li onClick={() => navigate("/categories", { state: { category: "general" } })}>
                            General
                        </li>
                        <li onClick={() => navigate("/categories", { state: { category: "health" } })}>
                            Health
                        </li>
                        <li onClick={() => navigate("/categories", { state: { category: "science" } })}>
                            Science
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default Navbar;

import { useState } from 'react';
import styles from '../App.module.css';
import Navbar from '../components/Navbar/Navbar';
import Header from '../components/Header/Header';
import Shortcut from '../components/Shortcut/Shortcut';
import Fproducts from '../components/Featuredproducts/Featuredproducts';
import Footer from '../components/Footer/Footer';
import { Provider } from "../components/ui/provider";
import SidebarFilter from '../components/filter/filter';

export const Catalog = () => {

    return (
        <Provider>
        <div className={styles.container}>
          <Navbar />
          <SidebarFilter/>
          <Fproducts />
          <Footer />
        </div>
      </Provider>
    )}
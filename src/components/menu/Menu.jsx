// 导入 React 核心库，用于创建 React 组件
import React from "react";
import styles from "./menu.module.css";
import MenuTags from "@/components/menuTags/MenuTags";
import MenuCategories from "@/components/menuCategories/MenuCategories";
import MenuIngredients from "@/components/menuIngredients/MenuIngredients";
const Menu = () => {
    return (
      <div className={styles.container}>
        <MenuTags />
        <MenuCategories />
        <MenuIngredients />
      </div>
    );
  };
  
  export default Menu;

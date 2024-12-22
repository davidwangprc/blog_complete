import styles from './page.module.css';
import FeaturedContent from "@/components/featuredContent/FeaturedContent";
import CardList from "@/components/cardList/CardList";
import CategoriesList from "@/components/categoriesList/CategoriesList";
import Menu from "@/components/menu/Menu";

// 生成元数据
export const metadata = {
  title: '首页 - 我的博客',
  description: '展示最新的文章、教程和笔记',
};

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main className={styles.container}>
      <FeaturedContent />
      <CategoriesList />
      <div className={styles.content}>
        <div className={styles.mainContent}>
          <CardList />
        </div>
        <Menu />
      </div>
    </main>
  );
}

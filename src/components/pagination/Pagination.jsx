import Link from 'next/link';
import styles from './pagination.module.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination = ({ currentPage, totalPages, baseUrl }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    
    return (
        <div className={styles.pagination}>
            {/* 上一页 */}
            {currentPage > 1 && (
                <Link 
                    href={`${baseUrl}page=${currentPage - 1}`}
                    className={styles.pageLink}
                >
                    <FaChevronLeft />
                </Link>
            )}

            {/* 页码 */}
            {pages.map(page => (
                <Link
                    key={page}
                    href={`${baseUrl}page=${page}`}
                    className={`${styles.pageLink} ${
                        currentPage === page ? styles.active : ''
                    }`}
                >
                    {page}
                </Link>
            ))}

            {/* 下一页 */}
            {currentPage < totalPages && (
                <Link 
                    href={`${baseUrl}page=${currentPage + 1}`}
                    className={styles.pageLink}
                >
                    <FaChevronRight />
                </Link>
            )}
        </div>
    );
};

export default Pagination; 
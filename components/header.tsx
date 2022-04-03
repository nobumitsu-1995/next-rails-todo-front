import Link from "next/link";
import styles from "../styles/utils.module.scss";

export default function Header() {
    return (
        <header className={styles.header}>
            <h1>
                <Link href="/" >
                    Todo APP
                </Link>
            </h1>
        </header>
    );
}
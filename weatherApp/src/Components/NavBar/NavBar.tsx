import styles from "./NavBar.module.css"
import { NavItem } from "./navigation.model";

const renderNavItems = (items: NavItem[]) => {
  return items.map((item: NavItem) => (
    <li key={item.id} className={styles.navbarItem}>
      <a className={styles.navbarLink} href={item.ref}>
        {item.name}
      </a>
    </li>
  ));
};

/**
 * Componente de barra de navegación.
 * Renderiza una barra de navegación con enlaces proporcionados.
 * 
 * @since 1.0.0
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {NavItem[]} props.items - Array de elementos para la navegación
 * 
 * @example
 
 * // Definición de items
 * const navigationItems = [
 *   { id: 1, name: 'Home', ref: '/' },
 *   { id: 2, name: 'About', ref: '/about' }
 * ];
 * 
 * // Uso del componente
 * function App() {
 *   return (
 *     <NavBar items={navigationItems} />
 *   );
 * }
 */
function NavBar({ items }: { items: NavItem[] }) {
  return (
    <div className={styles.navbar}>
      <nav className={styles.navbarNav}>
        <ul className={styles.navbarList}>{renderNavItems(items)}</ul>
      </nav>
    </div>
  );
}

export default NavBar;

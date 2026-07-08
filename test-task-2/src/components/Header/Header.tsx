import { useAuthStore } from "../../store/authStore.ts";
import { Link } from "react-router-dom";

export function Header() {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);


    return (
      <header className="header">
          <div className="header__inner">
              <Link to="/" className="header__logo">
                  iTerritory test
              </Link>
              <div className="header__actions">
                  {user
                      ?
                      (<span className="header__email">{user.email}</span>)
                      :
                      (<Link to="/login" className="header__login">Вход</Link>)
                  }
                  {user
                      ?
                      (<button type="button" onClick={logout}>Выйти</button>)
                      :
                      null
                  }
              </div>
          </div>
      </header>
    );
}
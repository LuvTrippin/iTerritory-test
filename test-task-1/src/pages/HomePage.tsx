import ImageWithFallback from "../components/ImageWithFallback/ImageWithFallback.tsx";
import Gallery from "../components/Gallery/Gallery.tsx";
import placeholderImg from "../assets/placeholder.jpg";

const HomePage = () => (
    <>
        <h1>Главная страница</h1>
        <p>Это основная страница для тестового задания от iТерритория</p>
        <section>
            <h2>О задаче</h2>
            <p>Необходимо разработать SPA на свободную тематику, используя React + TypeScript</p>
            <p>В тз описаны следующие требования:</p>
            <ul>
                <li>Оформленное README.md</li>
                <li>Только клиентская часть</li>
                <li>Свободная тематика</li>
                <li>TypeScript</li>
                <li>React 18+ с использованием Hooks</li>
                <li>ReactRouter – для навигации</li>
                <li>Vite – для сборки</li>
                <li>Адаптивная верстка</li>
                <li>Строгое соблюдение семантики</li>
                <li>Отсутствие inline-стилей</li>
                <li>
                    Данные замоканы, либо используется внешнее Api (через Axios)
                    <ul>
                        <li>
                            Ссылки:
                            <ul>
                                <li>Минимум 2 якорные ссылки</li>
                                <li>Минимум 2 страницы (включая главную страницу)</li>
                                <li>По 1 ссылке на телефон, email и внешний ресурс</li>
                            </ul>
                        </li>
                        <li>
                            Любое наполнение согласно тематике сайта, содержащее теги:
                            <ul>
                                <li>nav</li>
                                <li>h1, h2</li>
                                <li>section</li>
                                <li>article</li>
                                <li>aside (если будет боковая панель)</li>
                                <li>ul или ol</li>
                                <li>img с fallback-изображением</li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </section>
        <section>
            <h2>Реализация пунктов с изображениями</h2>
            <article>
                <h3>Изображение с fallback на React</h3>
                <ImageWithFallback
                    src="https://placehold.co/600x400/jpg?text=Hello"
                    fallback={placeholderImg}
                    alt="Оригинальная картинка"
                />
            </article>
            <article id="gallery">
                <h3>Галерея</h3>
                <Gallery/>
            </article>
        </section>
    </>
)

export default HomePage;

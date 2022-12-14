import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchAllProducts } from '../../store/product';
import './HomePage.css'
// import Footer from '../Footer';
import { resetProductsState } from '../../store/product';

const ProductHome = () => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const objProducts = useSelector(state => state.products.allProducts)
    const productsArr = Object.values(objProducts)

    const lemonProducts = (productsArr.filter(product => product.category === "Lemon")).sort(() => 0.5 - Math.random())
    const orangeProducts = productsArr.filter(product => product.category === "Orange").sort(() => 0.5 - Math.random())
    const limeProducts = productsArr.filter(product => product.category === "Lime").sort(() => 0.5 - Math.random())
    const grapeFruitProducts = productsArr.filter(product => product.category === "Grapefruit").sort(() => 0.5 - Math.random())
    const randomProducts = productsArr.sort(() => 0.5 - Math.random())
    const mainDisplayProducts = randomProducts.slice(0, 8) // 8 photos, index starts at 0, slice ends at number prior to end number
    const sponsoredDisplayProducts = randomProducts.slice(0, 6)


    useEffect(() => {
        dispatch(resetProductsState())
        dispatch(fetchAllProducts(objProducts))
    }, [dispatch])

    if(!productsArr) {
        return null
    }
    return (
        <div className='entire-home-container'>
            <div>
                {sessionUser ?
                    <div className='home-welcome'>Welcome Back, <NavLink className="home-name" to={`/account`}>{sessionUser.firstName}</NavLink><div>!</div> </div>
                    : <div className='home-welcome'> Welcome to Zesty!</div>
                }
                <div className='home-category-circles'>
                    <div className='welcome-background'>
                    </div>
                    <div className='category-cricles'>
                        <NavLink className="img-link" to={`/products/${lemonProducts[0]?.id}`}>
                            <div className='img-circle'>
                                <img src={lemonProducts[0]?.previewImage} className='individual-img' alt='individual'></img>
                            </div>
                            <div className='category-name'>Lemon</div>
                        </NavLink>

                    </div>
                    <div className='category-cricles'>
                        <NavLink className="img-link" to={`/products/${orangeProducts[0]?.id}`}>
                            <div className='img-circle'>
                                <img src={orangeProducts[0]?.previewImage} className='individual-img' alt='individual'></img>
                            </div>
                            <div className='category-name'>Orange</div>
                        </NavLink>

                    </div>
                    <div className='category-cricles'>
                        <NavLink className="img-link" to={`/products/${limeProducts[0]?.id}`}>
                            <div className='img-circle'>
                                <img src={limeProducts[0]?.previewImage} className='individual-img' alt='individual'></img>
                            </div>
                            <div className='category-name'>Lime</div>
                        </NavLink>
                    </div>
                    <div className='category-cricles'>
                        <NavLink className="img-link" to={`/products/${grapeFruitProducts[0]?.id}`}>
                            <div className='img-circle'>
                                <img src={grapeFruitProducts[0]?.previewImage} className='individual-img' alt='individual'></img>
                            </div>
                            <div className='category-name'>Grapefruit</div>
                        </NavLink>
                    </div>
                </div>
                <div className='display-product-main'>
                    {mainDisplayProducts?.map((product, i) => {
                        return (
                            <div className={`display-product-outer img${i}`}>
                                <NavLink to={`/products/${product.id}`}>
                                    <div className='display-img-outer'>
                                        <img src={product.previewImage} className={`display-product-img img${i}`} alt={product.id} />
                                    </div>
                                    <div className='display-product-price'>${parseFloat(product.price).toFixed(2)}</div>
                                </NavLink>
                            </div>
                        )
                    })}
                </div>
                <div className='sponsored-product-main'>
                    <div className='sponsored-outer-container'>
                    <div className='sponsored-message'>Sponsored<span className='sponsored-seller-message'>By Zesty sellers</span></div>
                    {sponsoredDisplayProducts?.map((product, i) => {
                        return (
                            <div className={`sponsored-product-outer image${i}`}>
                                <NavLink to={`/products/${product.id}`}>
                                    <div className='sponsored-img-outer'>
                                        <img src={product.previewImage} className={`sponsored-product-img image${i}`} alt={product.id} />
                                    </div>
                                    <div className='sponsor-product-price'>${parseFloat(product.price).toFixed(2)}</div>
                                </NavLink>
                            </div>
                        )
                    })}
                    <div className='fun-fact'>Fun fact: behind every sponsored item there is an Zesty seller hoping you'll check out their shop</div>
                    </div>
                </div>
            </div>
            <div className='footer-home-page'>
            {/* <Footer/> */}
            </div>
        </div>

    )
}



export default ProductHome;

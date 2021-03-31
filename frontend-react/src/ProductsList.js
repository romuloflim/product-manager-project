import React,  {useState, useEffect} from 'react';
import ProductsService from './ProductsService';

const productService = new ProductsService();

function ProductsList() {

    const [products, setProducts] = useState([])
    const [nextPageURL, setNextPageURL] = useState('')

    /*componentDidMount() {
        var self = this;
        productService.getProducts().then(function (result) {
            self.setState({ products:result.data, nextPageURL: result.nextlink})
        });
    }*/

    /*useEffect(() => {
        setInterval(() => {
            productService.getProducts().then(function (result) {
                console.log(result.data)
                setProducts(result.data);
                setNextPageURL(result.nextlink)
            });
        }, 5000);
    });*/

    useEffect(() => {
        const fetchData = async () => {
            const result = await productService.getProducts();
            console.log(result.data)
            setProducts(result.data);
            setNextPageURL(result.nextlink);
        }
        fetchData();
    }, []);

    /*handleDelete(e, pk) {
        var self = this;
        productService.deleteProduct({pk: pk}).then(() => {
            var newArrProd = self.state.products.filter(function(obj) {
                return obj.pk !== pk;
            })
            self.setState({products: newArrProd})
        })
    }*/

    /*const handleDelete = (e, pk) => {
        productService.deleteProduct({pk: pk}).then(() => {
            var newArrProd = products.filter(function(obj) {
                return obj.pk !== pk;
            });
            setProducts(newArrProd)
        });
    }*/

    const handleDelete = async (e, pk) => {
        await productService.deleteProduct({pk: pk});
        var newArrProd = products.filter(function(obj) {
            return obj.pk !== pk;
        })
        setProducts(newArrProd);
    }

    /*nextPage() {
        var self = this;
        productService.getProductsByURL(this.state.nextPageURL).then((result) => {
            self.setState({ products:result.data, nextPageURL: result.nextlink})
        })
    }*/

    const nextPage = async e => {
        const result = await productService.getProductsByURL(nextPageURL);
            setProducts(result.data);
            setNextPageURL(result.nextlink);
    }

    /*const nextPage = e => {
        productService.getProductsByURL(nextPageURL).then((result) => {
            setProducts(result.data);
            setNextPageURL(result.nextlink)
        })
    }*/

    return(
        <div className="products--list">
            <table className="table">
                <thead key="thead">
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Categoria</th>
                        <th>Tipo</th>
                        <th>Gênero</th>
                        <th>Tamanho</th>
                        <th>Cor</th>
                        <th>Marca</th>
                        <th>Preço</th>
                    </tr>
                </thead>
                <tbody>
                {products.map( prod => 
                    <tr key={prod.pk}>
                        <td>{prod.pk}</td>
                        <td>{prod.name}</td>
                        <td>{prod.category_name}</td>
                        <td>{prod.product_type_name}</td>
                        <td>{prod.gender_name}</td>
                        <td>{prod.size_name}</td>
                        <td>{prod.color}</td>
                        <td>{prod.brand_name}</td>
                        <td>{prod.price}</td>
                        <td>
                            <button onClick={(e) => handleDelete(e, prod.pk)}>Excluir</button>
                            <a href={"/product/" + prod.pk}>Editar</a>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
            <button className="btn btn-primary" onClick={(e) => nextPage(e)}>Próximo</button>
        </div>
    );
}

export default ProductsList
import { Button, Card, List } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BASE_IMG_URL } from '../../utils/constants';
import { reqCategory } from '../../api/index';
import { useState } from 'react';
import { useEffect } from 'react';
export default function Detail() {
  const navigate = useNavigate();
  const location = useLocation();
  const [primaryName, setPrimaryName] = useState();
  const [secondLevelName, setSecondLevelName] = useState();
  const [loading, setLoading] = useState(false);
  const { product } = location.state;
  // console.log(product)
  const getName = async () => {
    const pCategoryId = product.pCategoryId;
    const categoryId = product.categoryId;
    console.log(pCategoryId);
    if (pCategoryId === '0') {
      setLoading(true);
      const result = await reqCategory(categoryId);
      console.log(result);
      setPrimaryName(result.data.name);
      setLoading(false);
    } else {
      setLoading(true);
      const results = await Promise.all([
        reqCategory(pCategoryId),
        reqCategory(categoryId),
      ]);
      // const result1 = await reqCategory(pCategoryId)
      // const result2 = await reqCategory(categoryId)

      setPrimaryName(results[0].data.name);
      setSecondLevelName(results[1].data.name);
      setLoading(false);
    }
  };
  useEffect(() => {
    getName();
  }, []);
  const title = (
    <span>
      <Button
        type="link"
        style={{ marginRight: 10, fontSize: 20 }}
        onClick={() => {
          navigate(-1);
        }}
      >
        <ArrowLeftOutlined />
      </Button>

      <span>商品详情</span>
    </span>
  );
  return (
    <div>
      <Card
        title={title}
        className="product-detail"
        bordered={false}
        loading={loading}
      >
        <List
        // bordered
        >
          <List.Item>
            <span className="left">商品名称:</span>
            <span>{product.name}</span>
          </List.Item>
          <List.Item>
            <span className="left">商品描述:</span>
            <span>{product.desc}</span>
          </List.Item>
          <List.Item>
            <span className="left">商品价格:</span>
            <span>{product.price}元</span>
          </List.Item>
          <List.Item>
            <span className="left">所属分类:</span>
            <span>
              {primaryName} {secondLevelName ? ` --> ${secondLevelName}` : ''}
            </span>
            {/* <span>电脑--笔记本</span> */}
          </List.Item>
          <List.Item>
            <span className="left">商品图片:</span>
            <span>
              {product.imgs.map((img) => (
                <img
                  key={img}
                  src={BASE_IMG_URL + img}
                  // className="product-img"
                  alt="img"
                />
              ))}
            </span>
          </List.Item>
          <List.Item>
            <span className="left">商品详情:</span>
            <span dangerouslySetInnerHTML={{ __html: product.detail }}></span>
          </List.Item>
        </List>
      </Card>
    </div>
  );
}

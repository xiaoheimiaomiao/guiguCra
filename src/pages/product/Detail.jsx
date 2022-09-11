import { Button, Card, List } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import React from 'react'

export default function Detail() {
  const title = (
    <span>
      <Button
        type='link'
        style={{ marginRight: 10, fontSize: 20 }}
      >
        <ArrowLeftOutlined />
      </Button>

      <span>商品详情</span>
    </span>
  )
  return (
    <div>
      <Card title={title} className='product-detail'>
        <List>
          <List.Item>
            <span className="left">商品名称:</span>
            {/* <span>{name}</span> */}
            <span>00</span>
          </List.Item>
          <List.Item>
            <span className="left">商品描述:</span>
            <span>00</span>
            {/* <span>{desc}</span> */}
          </List.Item>
          <List.Item>
            <span className="left">商品价格:</span>
            <span>00</span>
            {/* <span>{price}元</span> */}
          </List.Item>
          <List.Item>
            <span className="left">所属分类:</span>
            {/* <span>{cName1} {cName2 ? ' --> '+cName2 : ''}</span> */}
            <span>00</span>
          </List.Item>
          <List.Item>
            <span className="left">商品图片:</span>
            {/* <span>
              {
                imgs.map(img => (
                  <img
                    key={img}
                    src={BASE_IMG_URL + img}
                    className="product-img"
                    alt="img"
                  />
                ))
              }
            </span> */}
          </List.Item>
          <List.Item>
            <span className="left">商品详情:</span>
            {/* <span dangerouslySetInnerHTML={{__html: detail}}> */}
            {/* </span> */}
            <span>00</span>
          </List.Item>

        </List>
      </Card>
    </div >
  )
}

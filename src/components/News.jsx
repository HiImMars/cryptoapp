import React, { useState } from "react";
import { Typography, Row, Col, Card, Select } from "antd";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory: newsCategory,
    count: simplified ? 6 : 30,
  });
  const { data } = useGetCryptosQuery(30);

  if (!cryptoNews?.news) return <Loader />;

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a category"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins.map((coin, idx) => (
              <Option key={idx} value={coin.name}>
                {coin.name}
              </Option>
            ))}
          </Select>
        </Col>
      )}
      {cryptoNews.news.map((item, idx) => (
        <Col xs={24} sm={12} lg={8} key={idx}>
          <Card hoverable className="news-card">
            <a href={item.Url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {item.Title}
                </Title>
                <img
                  src={item?.Image || demoImage}
                  alt="news"
                  width="200px"
                  height="120px"
                />
              </div>
              <p>
                {item.Description > 100
                  ? `${item.Description.substring(0, 100)}...`
                  : item.Description}
              </p>
              <div className="provider-container">
                <Text>{moment(item.PublishedOn).startOf("ss").fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;

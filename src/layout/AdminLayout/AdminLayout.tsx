import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  UserOutlined,
  LogoutOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Space } from "antd";
import styles from "./index.module.scss";
import { useRouter } from "next/router";
import { deleteCookie, getCookie } from "cookies-next";
import { useProfile } from "@/store/ManagerProfile/useProfile";
import {
  initialAdminProfile,
  initialManagerProfile,
} from "@/store/ManagerProfile/profile";
const { Header, Sider, Content } = Layout;

const AdminLayout = ({ children }: { children: any }) => {
  const [collapsed, setCollapsed] = useState(false);
  //@ts-ignore
  const [admin, setAdmin] = useState<any>();
  const { profileAdmin, setProfileAdmin } = useProfile();
  useEffect(() => {
    const adminProfile = JSON.parse(
      getCookie("adminProfile") as string
    );

    setAdmin(adminProfile);
  }, []);
  const router = useRouter();
  const handleLogout = () => {
    router.push("/admin/login");
    setProfileAdmin(initialAdminProfile);
    deleteCookie("adminId");
    deleteCookie("accessTokenAdmin");
  };
  const activeMenu = () => {
    switch (router.pathname) {
      case "/admin/hospital-management":
        return ["1"];
      case "/admin/doctor-management":
        return ["2"];
      case "/admin/user-management":
        return ["3"];
      default:
        return [];
    }
  };

  return (
    <Layout className={styles.managerLayout}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          borderRight: "1px solid rgba(0,0,0,0.1)",
          minWidth: "270px",
          // width: 270px;
        }}
      >
        <div className={styles.logo}>
          {!collapsed && (
            <img
              src="/images/logo-vcare.png"
              style={{
                width: "100px",
                height: "100px",
              }}
            />
          )}
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={activeMenu()}
          style={{
            height: "100vh",
            marginTop: "20px",
          }}
          items={[
            {
              key: "1",
              icon: <HomeOutlined />,
              label: (
                <div
                  onClick={() => {
                    router.push(
                      "/admin/hospital-management"
                    );
                  }}
                >
                  Quản lý bệnh viện
                </div>
              ),
            },
            {
              key: "2",
              icon: <UserOutlined />,
              label: (
                <div
                  onClick={() => {
                    router.push("/admin/doctor-management");
                  }}
                >
                  Quản lý bác sĩ
                </div>
              ),
            },
            {
              key: "3",
              icon: <UsergroupAddOutlined />,
              label: (
                <div
                  onClick={() => {
                    router.push("/admin/user-management");
                  }}
                >
                  Quản lý bệnh nhân
                </div>
              ),
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: "5px 15px",
            borderBottom: "1px solid rgba(0,0,0,0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {React.createElement(
            collapsed
              ? MenuUnfoldOutlined
              : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}

          {admin && (
            <>
              <Space>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: 600,
                  }}
                >
                  {admin?.email}
                </div>
                <Button
                  icon={<LogoutOutlined />}
                  danger
                  title="Đăng xuất"
                  onClick={handleLogout}
                ></Button>
              </Space>
            </>
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;

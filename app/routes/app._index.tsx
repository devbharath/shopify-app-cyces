import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import {
  Page,
  Layout,
  Text,
  Card,
  BlockStack,
  List,
  Link,
  InlineStack,
  IndexTable,
  useBreakpoints,
  Button,
} from "@shopify/polaris";
import {
  TitleBar,
  // useAppBridge
} from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";
import prisma from "app/db.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);

  const storeLocations = await prisma.storeLocation.findMany({
    where: { shop: session?.shop },
    orderBy: { createdAt: "desc" },
  });

  return { storeLocations };

  return null;
};

export default function Index() {
  //@ts-expect-error ignore
  const { storeLocations } = useLoaderData();
  const navigate = useNavigate();
  const { mdDown } = useBreakpoints();

  return (
    <Page fullWidth>
      <TitleBar title="Store Locations"></TitleBar>
      <BlockStack gap="500">
        <Layout>
          <Layout.Section>

            <BlockStack align="space-between" gap="200">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text as="h1"  variant="headingLg">Store Locations</Text>

                <Button size="large" url="/app/create-store">+ Create Store Location</Button>

              </div>
              <Card>
                <IndexTable
                  resourceName={{ singular: "location", plural: "locations" }}
                  itemCount={storeLocations?.length}
                  headings={[
                    { title: "Name" },
                    { title: "City" },
                    { title: "Country" },
                  ]}
                  selectable={false}
                  condensed={mdDown}
                >
                  {storeLocations?.map((location: any, index: number) => (
                    <IndexTable.Row
                      id={location.id}
                      key={location.id}
                      position={index}
                      // Navigate on row click
                      onClick={() => navigate(`/app/store/${location.id}`)}
                    >
                      <IndexTable.Cell>
                        <Text variant="bodyMd" fontWeight="medium" as="span">
                          {location.name}
                        </Text>
                      </IndexTable.Cell>
                      <IndexTable.Cell>{location.city}</IndexTable.Cell>
                      <IndexTable.Cell>{location.country}</IndexTable.Cell>
                    </IndexTable.Row>
                  ))}
                </IndexTable>
              </Card>
            </BlockStack>

          </Layout.Section>
          <Layout.Section variant="oneThird">
            <BlockStack gap="500">
              <Card>
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">
                    App template specs
                  </Text>
                  <BlockStack gap="200">
                    <InlineStack align="space-between">
                      <Text as="span" variant="bodyMd">
                        Framework
                      </Text>
                      <Link
                        url="https://remix.run"
                        target="_blank"
                        removeUnderline
                      >
                        Remix
                      </Link>
                    </InlineStack>
                    <InlineStack align="space-between">
                      <Text as="span" variant="bodyMd">
                        Database
                      </Text>
                      <Link
                        url="https://www.prisma.io/"
                        target="_blank"
                        removeUnderline
                      >
                        Prisma
                      </Link>
                    </InlineStack>
                    <InlineStack align="space-between">
                      <Text as="span" variant="bodyMd">
                        Interface
                      </Text>
                      <span>
                        <Link
                          url="https://polaris.shopify.com"
                          target="_blank"
                          removeUnderline
                        >
                          Polaris
                        </Link>
                        {", "}
                        <Link
                          url="https://shopify.dev/docs/apps/tools/app-bridge"
                          target="_blank"
                          removeUnderline
                        >
                          App Bridge
                        </Link>
                      </span>
                    </InlineStack>
                    <InlineStack align="space-between">
                      <Text as="span" variant="bodyMd">
                        API
                      </Text>
                      <Link
                        url="https://shopify.dev/docs/api/admin-graphql"
                        target="_blank"
                        removeUnderline
                      >
                        GraphQL API
                      </Link>
                    </InlineStack>
                  </BlockStack>
                </BlockStack>
              </Card>
              <Card>
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">
                    Next steps
                  </Text>
                  <List>
                    <List.Item>
                      Build an{" "}
                      <Link
                        url="https://shopify.dev/docs/apps/getting-started/build-app-example"
                        target="_blank"
                        removeUnderline
                      >
                        {" "}
                        example app
                      </Link>{" "}
                      to get started
                    </List.Item>
                    <List.Item>
                      Explore Shopify’s API with{" "}
                      <Link
                        url="https://shopify.dev/docs/apps/tools/graphiql-admin-api"
                        target="_blank"
                        removeUnderline
                      >
                        GraphiQL
                      </Link>
                    </List.Item>
                  </List>
                </BlockStack>
              </Card>
            </BlockStack>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}

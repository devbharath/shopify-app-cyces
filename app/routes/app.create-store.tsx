import { useState } from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { redirect, useFetcher } from "@remix-run/react";
import {
  Page,
  Layout,
  Text,
  Card,
  BlockStack,
  List,
  Link,
  InlineStack,
} from "@shopify/polaris";
import {
  TitleBar,
  // useAppBridge
} from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";
import StoreLocartionCreator from "app/components/StoreLocartionCreator";
import prisma from "app/db.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);
  return null;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { session } = await authenticate.admin(request); // get current merchant's shop

  const formData = await request.formData();
  const values = Object.fromEntries(formData);

  const {
    name,
    latitude,
    longitude,
    addressLine1,
    addressLine2,
    city,
    state,
    country,
    postalCode,
    phone,
    email,
  } = values;

  const lat = parseFloat(latitude?.toString());
  const lng = parseFloat(longitude?.toString());
  
  await prisma.storeLocation.create({
    data: {
      shop: session.shop, // this comes from session
      name: name?.toString(),
      lat,
      lng,
      addressLine1: addressLine1?.toString(),
      addressLine2: addressLine2?.toString(),
      city: city?.toString(),
      state: state?.toString(),
      country: country?.toString(),
      postalCode: postalCode?.toString(),
      phone: phone?.toString(),
      email: email?.toString(),
    },
  });

  return redirect(`/app`);
};

export default function Index() {
  const fetcher = useFetcher<typeof action>();
  type FormState = {
    name: string;
    latitude: string;
    longitude: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    phone: string;
    email: string;
  };

  const [formState, setFormState] = useState<FormState>({
    name: "",
    latitude: "",
    longitude: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});

  const hanldeValidate = () => {
    const errs: Partial<Record<keyof FormState, string>> = {};
    (Object.keys(formState) as (keyof FormState)[]).forEach((key) => {
      if ([undefined, ""].includes(formState[key])) {
        errs[key] = "This field is required";
      }
    });
    if (Object.keys(errs).length) {
      setErrors(errs);
      return false;
    }
    return true;
  };

  // const shopify = useAppBridge();

  const handleSubmit = () => {
    if (hanldeValidate()) console.log("DATA", formState);
    fetcher.submit(formState, {
      method: "POST",
    });
  };

  const isLoading =
    ["loading", "submitting"].includes(fetcher.state) &&
    fetcher.formMethod === "POST";


  return (
    <Page fullWidth>
      <TitleBar title="Create Store Locations"></TitleBar>
      <BlockStack gap="500">
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="500">
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">
                    Create a Store Location
                  </Text>
                  <StoreLocartionCreator
                    formState={formState}
                    setFormState={setFormState}
                    handleSubmit={handleSubmit}
                    erorrs={errors}
                    isLoading={isLoading}
                  />
                </BlockStack>
              </BlockStack>
            </Card>
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

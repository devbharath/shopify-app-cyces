//@ts-nocheck
import {
  BlockStack,
  Button,
  Divider,
  Form,
  FormLayout,
  TextField,
} from "@shopify/polaris";

const StoreLocationCreator = ({ handleSubmit, formState, setFormState, erorrs, isLoading }) => {
  const handleChange = (field) => (value) =>
    setFormState((prev) => ({ ...prev, [field]: value }));

  return (
    <BlockStack>
      <Form onSubmit={handleSubmit}>
        <FormLayout>
          <TextField
            label="Name of the Shop"
            type="text"
            value={formState?.name}
            onChange={handleChange("name")}
            autoComplete="off"
            helpText="This name will be displayed on the map marker."
            error={erorrs['name']}
          />

          <FormLayout.Group>
            <TextField
              label="Latitude"
              type="number"
              value={formState?.latitude}
              onChange={handleChange("latitude")}
              autoComplete="off"
              error={erorrs['latitude']}
            />
            <TextField
              label="Longitude"
              type="number"
              value={formState?.longitude}
              onChange={handleChange("longitude")}
              autoComplete="off"
              error={erorrs['longitude']}
            />
          </FormLayout.Group>

          <FormLayout.Group>
            <TextField
              label="Address Line 1"
              type="text"
              value={formState?.addressLine1}
              onChange={handleChange("addressLine1")}
              autoComplete="off"
              error={erorrs['addressLine1']}

            />
            <TextField
              label="Address Line 2"
              type="text"
              value={formState?.addressLine2}
              onChange={handleChange("addressLine2")}
              autoComplete="off"
              error={erorrs['addressLine2']}

            />
          </FormLayout.Group>

          <FormLayout.Group>
            <TextField
              label="City"
              type="text"
              value={formState?.city}
              onChange={handleChange("city")}
              autoComplete="off"
              error={erorrs['city']}

            />
            <TextField
              label="State / Province"
              type="text"
              value={formState?.state}
              onChange={handleChange("state")}
              autoComplete="off"
              error={erorrs['state']}

            />
          </FormLayout.Group>

          <FormLayout.Group>
            <TextField
              label="Country"
              type="text"
              value={formState?.country}
              onChange={handleChange("country")}
              autoComplete="off"
              error={erorrs['country']}

            />
            <TextField
              label="Postal Code"
              type="text"
              value={formState?.postalCode}
              onChange={handleChange("postalCode")}
              autoComplete="off"
              error={erorrs['postalCode']}

            />
          </FormLayout.Group>

          <FormLayout.Group>
            <TextField
              label="Phone Number"
              type="tel"
              value={formState?.phone}
              onChange={handleChange("phone")}
              autoComplete="off"
              error={erorrs['phone']}

            />
            <TextField
              label="Email"
              type="email"
              value={formState?.email}
              onChange={handleChange("email")}
              autoComplete="off"
              error={erorrs['email']}

            />
          </FormLayout.Group>


          <Button variant="primary" disabled={isLoading} loading={isLoading} submit>
            Save Store Location
          </Button>
        </FormLayout>
      </Form>
      <Divider />
    </BlockStack>
  );
};

export default StoreLocationCreator;

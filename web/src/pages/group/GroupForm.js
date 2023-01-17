import { TextField, Box, Grid, Typography, Button } from "@mui/material";

import { grey } from "@mui/material/colors";
import * as Yup from "yup";
import { useFormik } from "formik";
import { validationErrors } from "../../utils/constants";

const GroupFormScheme = Yup.object().shape({
  code: Yup.string()
    .max(25, validationErrors.group.code.max)
    .required(validationErrors.group.code.required),
  name: Yup.string()
    .max(75, validationErrors.group.name.max)
    .required(validationErrors.group.name.required),
  address: Yup.string()
    .max(100, validationErrors.group.address.max)
    .required(validationErrors.group.address.required),
});

export default function GroupForm({ onSubmitForm, updating, groupUpdate }) {
  const formik = useFormik({
    initialValues: {
      code: groupUpdate?.code ?? "",
      name: groupUpdate?.name ?? "",
      address: groupUpdate?.address ?? "",
    },
    enableReinitialize: true,
    validationSchema: GroupFormScheme,

    onSubmit: (values) => {
      const dataGroup = {
        ...(!updating && { code: values.code }),
        name: values.name,
        address: values.address,
      };

      onSubmitForm(dataGroup);
    },
  });

  return (
    <>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          border: "1px solid",
          borderColor: grey[300],
          p: 4,
          mt: 3,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Crear familia
        </Typography>

        <Box sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled={updating}
                id="code"
                name="code"
                label="Código"
                fullWidth
                autoComplete="family-name"
                size="small"
                value={formik.values.code}
                onChange={formik.handleChange}
                error={formik.touched.code && Boolean(formik.errors.code)}
                helperText={formik.touched.code && formik.errors.code}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="name"
                name="name"
                label="Nombre"
                fullWidth
                autoComplete="given-name"
                size="small"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                id="address"
                name="address"
                label="Dirección"
                fullWidth
                autoComplete=""
                size="small"
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                {updating ? "Actualizar" : "Crear"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

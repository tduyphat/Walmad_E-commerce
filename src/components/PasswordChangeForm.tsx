import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Grid,
  Button,
} from "@mui/material";
import PasswordChangeInput from "../interfaces/PasswordChangeInput";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

interface PasswordChangeFormProps {
  passwordForm: PasswordChangeInput;
  showPassword: boolean;
  handleTogglePasswordVisibility: () => void;
  handlePasswordFormChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handlePasswordFormClose: () => void;
  handleChangePassword: () => void;
}

const PasswordChangeForm: React.FC<PasswordChangeFormProps> = ({
  passwordForm,
  showPassword,
  handleTogglePasswordVisibility,
  handlePasswordFormChange,
  handlePasswordFormClose,
  handleChangePassword,
}) => {
  return (
    <Box sx={style}>
      <TextField
        margin="normal"
        fullWidth
        name="currentPassword"
        label="Current Password"
        value={passwordForm.currentPassword}
        type={showPassword ? "text" : "password"}
        id="currentPassword"
        autoComplete="current-password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        onChange={handlePasswordFormChange}
      />
      <TextField
        margin="normal"
        fullWidth
        name="newPassword"
        label="New Password"
        value={passwordForm.newPassword}
        type={showPassword ? "text" : "password"}
        id="newPassword"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        onChange={handlePasswordFormChange}
      />
      <TextField
        margin="normal"
        fullWidth
        name="confirmNewPassword"
        label="Confirm New Password"
        value={passwordForm.confirmNewPassword}
        type={showPassword ? "text" : "password"}
        id="confirmNewPassword"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        onChange={handlePasswordFormChange}
      />
      <Grid container spacing={2} sx={{ mt: 3, mb: 2 }}>
        <Grid item xs={12} sm={6}>
          <Button
            size="large"
            fullWidth
            onClick={handlePasswordFormClose}
            variant="outlined"
          >
            Cancel
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            size="large"
            onClick={handleChangePassword}
            fullWidth
            variant="contained"
            disabled={
              passwordForm.currentPassword === "" ||
              passwordForm.newPassword === "" ||
              passwordForm.confirmNewPassword === "" ||
              passwordForm.confirmNewPassword !== passwordForm.newPassword
                ? true
                : false
            }
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PasswordChangeForm;

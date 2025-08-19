import { Button, Container } from '@mui/material';

type NavBarProps = {
  handleLogOut: React.Dispatch<React.SetStateAction<boolean>>;
};

function NavBar({ handleLogOut }: NavBarProps) {
  return (
    <Container>
      {/* Current user: {} */}
      <Button
        className="!bg-indigo-600 !text-white hover:!bg-indigo-700"
        onClick={() => handleLogOut(false)}
      >
        Log Out
      </Button>
    </Container>
  );
}

export default NavBar;

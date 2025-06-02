import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; // pour éviter de modifier l'état si le composant est démonté

    axios
      .get("http://localhost:5000/api/vendors")
      .then((response) => {
        if (isMounted) {
          setVendors(response.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Erreur axios :", error);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <div>Chargement...</div>;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="Liste des vendeurs">
        <TableHead>
          <TableRow>
            <TableCell>Nom</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Lieu</TableCell>
            <TableCell>Note</TableCell>
            <TableCell>Tarif</TableCell>
            <TableCell>Contact</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vendors.map((vendor) => (
            <TableRow key={vendor._id}>
              <TableCell>{vendor.name}</TableCell>
              <TableCell>{vendor.type}</TableCell>
              <TableCell>{vendor.description}</TableCell>
              <TableCell>{vendor.location}</TableCell>
              <TableCell>{vendor.rating}</TableCell>
              <TableCell>{vendor.priceRange}</TableCell>
              <TableCell>{vendor.contact}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Vendors;

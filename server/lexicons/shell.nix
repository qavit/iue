nix
   { pkgs ? import <nixpkgs> {} }:

   pkgs.mkShell {
     buildInputs = [
       pkgs.python311Packages.pandas 
       pkgs.python311Packages.openpyxl
       pkgs.python311Packages.tqdm
     ];
   }

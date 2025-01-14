{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.python311Packages.pandas
    pkgs.python311Packages.tqdm 
    pkgs.python311Packages.virtualenv # Or pkgs.python311 if using venv
  ];
  shellHook = ''
    python3 -m venv .venv 
    source .venv/bin/activate
  '';
}
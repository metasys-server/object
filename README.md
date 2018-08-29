# get-metaobject

Retrieve a metasys object from metasys server

## Installation

This can be installed globally as a command line application.

```bash
npm install -g @serverkit/get-metaobject
```

## Usage

```bash
$ get-metaobject --ca ../thesun.pem "thesun:Earth3601/Programming.AV1"
Password: *********
{
  "id": "c334e3a8-a2a0-53ec-ac86-2f2fc5746748",
  "itemReference": "thesun:Earth3601/Programming.AV1",
  "name": "AV1",
  "type": "/enumSets/508/members/165",
  "self": "/objects/c334e3a8-a2a0-53ec-ac86-2f2fc5746748",
  "parent": "/objects/d24ead32-6895-5ba9-90b9-1976464c7fe0",
  "objects": "/objects/c334e3a8-a2a0-53ec-ac86-2f2fc5746748/objects",
  "networkDevice": "/networkDevices/2603fb33-3e15-5360-a27b-413fa04d166f",
  "points": "/objects/c334e3a8-a2a0-53ec-ac86-2f2fc5746748/points",
  "attributes": "/objects/c334e3a8-a2a0-53ec-ac86-2f2fc5746748/attributes",
  "alarms": "/objects/c334e3a8-a2a0-53ec-ac86-2f2fc5746748/alarms",
  "audits": "/objects/c334e3a8-a2a0-53ec-ac86-2f2fc5746748/audits"
}
```

For this to work I had to specify environment variables for the username and hostname.
See the next section on how to do this or other ways to provide this information.

## Specifying Credentials and Host

You must provide username and password. You can also specify a hostname.
If no hostname is provided, then you it will be derived from the specified object reference.
If no password is provided, the app will prompt you for one.

The parameters can be provided in one of three ways:

1. You can supply them on the command line:

    ```bash
    get-metaobject -u john -p pass -h myadx "myadx:mynae/myobject"
    ```

2. You can supply them thru a file:

    Create a json file and name what you like (eg. metasys.json)

    ```json
    {
        "username": "john",
        "password": "pass",
        "hostname": "myadx"
    }
    ```

    And then use the `-f` switch

    ```bash
    get-metaobject -f metasys.json "myadx:mynae/myobject"
    ```

3. Use environment variables (Note: password can't be specified using env variable.)

    ```bash
    export METASYS_USERNAME=john
    export METASYS_HOSTNAME=myadx
    get-metaobject "myadx:mynae/myobject"
    ```

## Certificates

If the computer you are on doesn't trust the certificate on the Metasys Server there are two switches you can use.

1. Use `--ca` switch to pass a `.pem` file.

    ```bash
    get-metaobject --ca /path/to/server.pem "myadx:mynae/myobject"
    ```
2. Use `--insecure` switch.

    **Note: This should never be used on a production system.
    As the switch name suggests, this is an insecure practice.**

    ```bash
    get-metaobject --insecure "myadx:mynae/myobject"
    ```



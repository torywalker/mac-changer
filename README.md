# mac-changer

A Node CLI tool for managing the MAC addresses of networking interfaces in macOS (OSX).

## Usage

```
Usage: mac [options] <interface>

  View and change the MAC address for any interface


  Options:

    -a, --all        display MAC addresses for available interfaces
    -d, --display    display current MAC address
    -r, --random     set random MAC address
    -s, --set <mac>  set MAC address for interface
    -v, --version    output the version number
    -h, --help       output usage information
```

## Install

```
npm install -g mac-changer
```

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) for code of conduct details, and the process for submitting pull requests.


## License

This project is licensed under the GNU 3 License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

This port was inspired by the ruby package, [macchanger](https://github.com/acrogenesis/macchanger). Please note that most options are different, and the logic implementation is not the same.